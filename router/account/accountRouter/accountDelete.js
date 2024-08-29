import userData from '../../../data/userData.js'
import { isValidString } from '../../../validations/userValidations.js';

export function accountDelete(req, res) {
    const { name, surname } = req.params;

    if (userData.length === 0) {
        return res.status(404).json({ error: 'User data array is empty.' });
    }

    const userIndex = userData.findIndex(user =>
        user.name.toLowerCase() === name.toLowerCase() &&
        user.surname.toLowerCase() === surname.toLowerCase()
    );
    const user = userData[userIndex];

    const nameError = isValidString(name, 'Name');
    const surnameError = isValidString(surname, 'Surname');

    if (nameError || surnameError) {
        return res.status(400).json({ error: nameError || surnameError });
    }

    if (userIndex !== -1) {
        if (user.balance === 0) {
            userData.splice(userIndex, 1);
            return res.status(200).json({ success: `User "${user.name} ${user.surname}" has been successfully deleted.` });
        } else {
            return res.status(400).json({ error: `Deletion failed: User "${user.name} ${user.surname}" has a balance of ${user.balance} USD.` });
        }
    } else {
        return res.status(404).json({ error: `User: "${name} ${surname}" not found.` });
    }
}