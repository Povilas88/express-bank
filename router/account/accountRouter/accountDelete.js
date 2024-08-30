import userData from '../../../data/userData.js';
import { isValidRequest } from '../../../validations/userValidations.js';

export function accountDelete(req, res) {
    const { name, surname } = req.params;

    if (!isValidRequest(req.body)) {
        return res.status(400).json({ error: 'Invalid body request.' });
    }

    if (userData.length === 0) {
        return res.status(404).json({ error: 'User data array is empty.' });
    }

    const userIndex = userData.findIndex(user =>
        user.name.toLowerCase() === name.toLowerCase() &&
        user.surname.toLowerCase() === surname.toLowerCase()
    );

    if (userIndex !== -1) {
        const user = userData[userIndex];

        if (user.balance === 0) {
            userData.splice(userIndex, 1);
            return res.status(200).json({
                success: `User "${user.name} ${user.surname}" has been successfully deleted.`
            });
        } else {
            return res.status(400).json({
                error: `Deletion failed: User "${user.name} ${user.surname}" has a balance of ${user.balance} USD.`
            });
        }
    } else {
        return res.status(404).json({
            error: `User: "${name} ${surname}" not found.`
        });
    }
}