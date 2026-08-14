const validateRequest = (schema) => (req, res, next) => {
    if (req.body && Object.keys(req.body).length > 0) {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        next();
    } else {
        return res.status(400).json({ message: "Please provide valid data" });
    }



}


export default validateRequest;