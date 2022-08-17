export class House {
    constructor({ id, style, bdrm, bath, price, img, description }) {
        this.id = id
        this.style = style || ''
        this.bdrm = bdrm || ''
        this.bath = bath || ''
        this.price = price || 100000
        this.img = img || ''
        this.description = description || ''
    }
}