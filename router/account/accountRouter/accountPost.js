import userData from '../../../data/userData.js'
import { isValidString, isValidBirthday, isValidRequest, getAge } from '../../../validations/userValidations.js';

export function accountPost(req, res) {
    const { name, surname, birthDate } = req.body;

    if (!isValidRequest(req.body)) {
        return res.status(400).json({ error: 'Invalid body request.' });
    }

    if (userData.length === 0 && !name && !surname) {
        return res.status(400).json({ error: 'User data array is empty.' });
    }

    if (!name || !surname || !birthDate) {
        return res.status(400).json({ error: 'Name, surname and birth date are required.' });
    }

    const nameError = isValidString(name, 'Name');
    const surnameError = isValidString(surname, 'Surname');

    if (nameError || surnameError) {
        return res.status(400).json({ error: nameError || surnameError });
    }

    if (!isValidBirthday(birthDate)) {
        return res.status(400).json({ error: 'Invalid birthday format.' });
    }

    if (getAge(birthDate) < 18) {
        return res.status(403).json({ error: 'You must be at least 18 years old to open an account.' });
    }

    const isUnique = !userData.some(user => user.name === name && user.surname === surname);

    if (!isUnique) {
        return res.status(400).json({ error: 'Name and surname combination must be unique.' });
    }

    userData.push({ name, surname, birthDate, balance: 0 });
    return res.status(200).json({ success: 'Account created successfully.' });
}