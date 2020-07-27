const Mask = {
    apply(input, func) {
        setTimeout(function() {
            input.value = Mask[func](input.value)
        }, 1)
    },
    formatBRL(value) {
        value = value.replace(/\D/g, "")

        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value / 100)
    }
}

const PhotosUpload = {
    input: "",
    preview: document.querySelector('#photos-preview'),
    uploadLimit: 6,
    files: [],
    handleFileInput(event) {
        const { files: fileList } = event.target
        PhotosUpload.input = event.target

        if (PhotosUpload.hasLimit(event)) return

        Array.from(fileList).forEach(file => {

            PhotosUpload.files.push(file)

            // Lendo arquivos com o FileReader
            const reader = new FileReader()
            // Quando estiver pronto a leitura
            reader.onload = () => {
                const image = new Image() //igual a isso no HTML:<img></img>
                image.src = String(reader.result)

                const div = PhotosUpload.getContainer(image)

                PhotosUpload.preview.appendChild(div)
            }
            // Ele ficara pronto no momento que ele ler o file
            reader.readAsDataURL(file)
        })

        PhotosUpload.input.files = PhotosUpload.getAllFiles()
    },
    hasLimit(event) {
        const { uploadLimit, input, preview } = PhotosUpload
        const { files: fileList } = input

        // Primeira verificação na adição das fotos
        if (fileList.length > uploadLimit) {
            alert(`Envie no máximo ${uploadLimit} fotos`)
            // Bloqueando o envio dos arquivos caso > 6
            event.preventDefault()
            return true
        }

        //Contador para adições de fotos, após a primeira adição
        const photosDiv = []
        //Para cada filho do preview
        preview.childNodes.forEach(item => {
            if(item.classList && item.classList.value == "photo")
            photosDiv.push(item)
        })

        const totalPhotos = fileList.length + photosDiv.length
        if (totalPhotos > uploadLimit) {
            alert("Você atingiu o limite máximo de fotos")
            event.preventDefault()
            return true
        }

        return false
    },
    getAllFiles() {
        // Trabalhando com o DataTransfer para manipular o fileList
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()

        PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

        return dataTransfer.files
    },
    getContainer(image) {
        const div = document.createElement('div')
        div.classList.add('photo')

        div.onclick = PhotosUpload.removePhoto

        div.appendChild(image)

        div.appendChild(PhotosUpload.getRemoveButton())

        return div
    },
    getRemoveButton() {
        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = "close"
        
        return button
    },
    removePhoto(event) {
        //event.target->tag <i> | parentNode->tag <div class="photo">
        const photoDiv = event.target.parentNode //<div class="photo">
        //Obtendo a lista do photosArray
        const photosArray = Array.from(PhotosUpload.preview.children)
        const index = photosArray.indexOf(photoDiv)

        //Removendo as fotos quando selecionadas
        PhotosUpload.files.splice(index, 1)
        //Atualizando os arquivos dentro do array
        PhotosUpload.input.files = PhotosUpload.getAllFiles()


        photoDiv.remove();
    }
}