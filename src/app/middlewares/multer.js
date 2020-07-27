const multer = require('multer')

//Onde as fotos serão salvas ou
//configuração de armazenamento...
//req=ok ou err | file=arquivo | cb=callback-resposta
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now().toString()}-${file.originalname}` )
    }
})

//Para cada um dos elementos fazer um find()
// e identificar se são do mesmo tipo. Usando o mimetipe do 'file'
const fileFilter = (req, file, cb) => {
    const isAccepted = ['image/png', 'image/jpg', 'image/jpeg']
    .find(acceptedFormat => acceptedFormat == file.mimetype)

    if (isAccepted) {
        return cb(null, true)
    }

    return cb(null, false)
}

module.exports = multer({
    storage,
    fileFilter
})