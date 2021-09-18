
const enumValue = (name) => Object.freeze({toString: () => name});

export const UserRoles = Object.freeze({
    SuperAdmin: enumValue("UserRoles.SuperAdmin"),
    VendorAdmin: enumValue("UserRoles.VendorAdmin"),
    ClientSuperAdmin: enumValue("UserRoles.ClientSuperAdmin"),
    ClientAdmin: enumValue("UserRoles.ClientAdmin"),
    ClientManager: enumValue("UserRoles.ClientManager"),
    VendorManager: enumValue("UserRoles.VendorManager"),
    Developer: enumValue("UserRoles.Developer"),
    Undefined: enumValue("UserRoles.Undefined")
});

export const TreeItemType = Object.freeze({
    State: enumValue("TreeItemType.State"),
    District: enumValue("TreeItemType.District"),
    City: enumValue("TreeItemType.City"),
    Complex: enumValue("TreeItemType.Complex"),
});