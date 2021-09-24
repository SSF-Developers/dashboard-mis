
const enumValue = (name) => Object.freeze({toString: () => name});

export const UiAdminDestinations = Object.freeze({
    Home: enumValue("UiAdminDestinations.Home"),
    CreateUser: enumValue("UiAdminDestinations.CreateUser"),
    MemberDetailsHome: enumValue("UiAdminDestinations.MemberDetailsHome"),
    MemberDetails: enumValue("UiAdminDestinations.MemberDetails"),
    MemberAccess: enumValue("UiAdminDestinations.MemberAccess"),
    DefineAccess: enumValue("UiAdminDestinations.DefineAccess"),
});

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