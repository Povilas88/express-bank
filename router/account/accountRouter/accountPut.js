import userData from '../../../data/userData.js'
import { isValidString, isValidBirthday, isValidRequest, getAge } from '../../../validations/userValidations.js';

export function accountPut(req, res) {
    const { name, surname } = req.params;
    const { newName, newSurname, newBirthDate } = req.body;

    if (!isValidRequest(req.body)) {
        return res.status(400).json({ error: 'Invalid body request.' });
    }

    const userIndex = userData.findIndex(user =>
        user.name.toLowerCase() === name.toLowerCase() &&
        user.surname.toLowerCase() === surname.toLowerCase()
    );

    if (userIndex === -1) {
        return res.status(404).json({ error: `User: "${name} ${surname}" not found.` });
    }

    if (!newName || !newSurname || !newBirthDate) {
        return res.status(400).json({ error: 'Name, surname, and birth date are required.' });
    }

    const nameError = isValidString(name, 'Name');
    const surnameError = isValidString(surname, 'Surname');

    if (nameError || surnameError) {
        return res.status(400).json({ error: nameError || surnameError });
    }

    if (!isValidBirthday(newBirthDate)) {
        return res.status(400).json({ error: 'Invalid birthday format.' });
    }

    if (getAge(newBirthDate) < 18) {
        return res.status(403).json({ error: "Users can't be younger than 18." });
    }

    const isUnique = !userData.some((user, index) =>
        index !== userIndex && user.name === newName && user.surname === newSurname
    );

    if (!isUnique) {
        return res.status(400).json({ error: 'Name and surname combination must be unique.' });
    }

    userData[userIndex] = { name: newName, surname: newSurname, birthDate: newBirthDate };
    return res.status(200).json({ success: 'Account updated successfully.' });
}