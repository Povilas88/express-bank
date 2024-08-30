import userData from '../../../data/userData.js';
import { isValidRequest } from '../../../validations/userValidations.js';

export function accountGet(req, res) {
    const { name, surname } = req.params;

    if (!isValidRequest(req.body)) {
        return res.status(400).json({ error: 'Invalid body request.' });
    }

    if (userData.length === 0) {
        return res.status(404).json({ error: 'User data array is empty.' });
    }

    const user = userData.find(user =>
        user.name.toLowerCase() === name.toLowerCase() &&
        user.surname.toLowerCase() === surname.toLowerCase()
    );

    if (user) {
        return res.status(200).json({
            success: `User real name: "${user.name} ${user.surname}", date of birth: ${user.birthDate}.`
        });
    } else {
        return res.status(404).json({
            error: `User: "${name} ${surname}" not found.`
        });
    }
}