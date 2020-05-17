db.createUser(
    {
        user: "mongouser",
        pwd: "elsuperpassword",
        roles: [
            {
                role: "readWrite",
                db: "favorite-stuff"
            }
        ]
    }
)