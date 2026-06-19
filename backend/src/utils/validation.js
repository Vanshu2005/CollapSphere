const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName || !emailId || !password) {
        throw new Error("All fields (firstName, lastName, emailId, password) are required");
    }

    // Basic email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailId)) {
        throw new Error("Invalid email format");
    }

    if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
    }

    return true;
};

const validateEditProfileData = (req) => {
    const allowedEditFields = [
        "firstName",
        "lastName",
        "photoUrl",
        "gender",
        "age",
        "about",
        "skills"
    ];

    const updates = Object.keys(req.body);

    if (updates.length === 0) {
        throw new Error("No fields provided to update");
    }

    const invalidFields = updates.filter((field) => !allowedEditFields.includes(field));

    if (invalidFields.length > 0) {
        throw new Error(`Invalid fields in update request: ${invalidFields.join(", ")}`);
    }

    return true;
};

module.exports = {
    validateSignUpData,
    validateEditProfileData
};
