class UserModelServiceFront {
    // Define the roleMap with a specific type that matches the keys with the expected role IDs
    private roleMap: { [key: number]: string } = {
        1: 'Admin',
        2: 'User',
        // more mappings as needed
    };

    public getRoleFromId(roleId: number): string {
        // Access roleMap directly since it's a property of the class
        return this.roleMap[roleId] || 'Unknown';
    }
}

export const userModelServiceFront = new UserModelServiceFront();
