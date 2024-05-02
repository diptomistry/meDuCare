import express from 'express';
import pool from '../../database.js'; // Import your database connection pool

import bcryptjs from 'bcryptjs';

const router = express.Router();

// get all roles and permission to each role

router.get('/get-roles', async (req, res) => {
    console.log('get roles');
    try {
        const [roles] = await pool.query('SELECT * FROM Roles');
        console.log(roles);
        return res.status(200).json({ success: true,roles: roles});
    } catch (error) {
        console.log(error);
        return res.status(200).json({ success: false, message: 'Internal server error' });
    }
}
);

// get roles and corresponding permissions

router.get('/get-role-permissions', async (req, res) => {
    try {
        const query = `
            SELECT 
                r.RoleID AS roleId,
                r.RoleName AS roleName,
                p.PermissionID AS permissionId,
                p.Permission AS permissionName
            FROM 
                Roles r
            LEFT JOIN 
                RolePermissions rp ON r.RoleID = rp.RoleID
            LEFT JOIN 
                Permissions p ON rp.PermissionID = p.PermissionID
            ORDER BY 
                r.RoleID;
        `;

        const [rows] = await pool.query(query);

        // Organize permissions under each role
        const organizedRoles = {};
        rows.forEach(row => {
            const roleId = row.roleId;
            if (!organizedRoles[roleId]) {
                organizedRoles[roleId] = {
                    roleId: roleId,
                    roleName: row.roleName,
                    permissions: []
                };
            }
            // Add permission to the corresponding role
            if (row.permissionId) { // Check if permission exists (LEFT JOIN may result in NULL permissionId)
                organizedRoles[roleId].permissions.push({
                    permissionId: row.permissionId,
                    permissionName: row.permissionName
                });
            }
        });

        // Convert object to array
        const rolesArray = Object.values(organizedRoles);

        return res.status(200).json({ success: true, roles: rolesArray });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// assign permission to role

router.post('/assign-permission', async (req, res) => {
    const { roleId, permissionId } = req.body;

    if (!roleId || !permissionId) {
        return res.status(400).json({ success: false, message: 'Role ID and permission ID are required' });
    }

    try {
        const [role] = await pool.query('SELECT * FROM Roles WHERE RoleID = ?', [roleId]);
        if (role.length === 0) {
            return res.status(400).json({ success: false, message: 'Role does not exist' });
        }

        const [permission] = await pool.query('SELECT * FROM Permissions WHERE PermissionID = ?', [permissionId]);
        if (permission.length === 0) {
            return res.status(400).json({ success: false, message: 'Permission does not exist' });
        }

        const [existing] = await pool.query('SELECT * FROM RolePermissions WHERE RoleID = ? AND PermissionID = ?', [roleId, permissionId]);
        if (existing.length > 0) {
            return res.status(400).json({ success: false, message: 'Permission already assigned to role' });
        }

        await pool.query('INSERT INTO RolePermissions (RoleID, PermissionID) VALUES (?, ?)', [roleId, permissionId]);
        return res.status(200).json({ success: true, message: 'Permission assigned to role successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
);



export default router;