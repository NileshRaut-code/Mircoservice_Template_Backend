
const ProductAll = async (req, res) => {
    try {
        
        return res.status(200).json({
            success: true,
            message: "The Product Reciveed"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};


const AuthAll = async (req, res) => {
    try {
        
        return res.status(200).json({
            success: true,
            message: "The Auth Product Reciveed"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};



export { AuthAll,ProductAll };