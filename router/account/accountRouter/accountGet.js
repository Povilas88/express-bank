import userData from '../../../data/userData.js'
import { isValidString } from '../../../validations/userValidations.js';

export function accountGet(req, res) {
    const { name, surname } = req.params;
    const user = userData.find(user =>
        user.name.toLowerCase() === name.toLowerCase() &&
        user.surname.toLowerCase() === surname.toLowerCase()
    );

    if (userData.length === 0) {
        return res.status(404).json({ error: 'User data array is empty.' });
    }

    const nameError = isValidString(name, 'Name');
    const surnameError = isValidString(surname, 'Surname');

    if (nameError || surnameError) {
        return res.status(400).json({ error: nameError || surnameError });
    }

    if (user) {
        return res.status(200).json({
            success: `User real name: "${user.name} ${user.surname}", date of birth: ${user.birthDate}.`
        });
    } else {
        return res.status(404).json({ error: `User: "${name} ${surname}" not found.` });
    }
}