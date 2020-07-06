class HashMap{
    constructor(initialCapacity=8){
        this.length = 0
        this._hashTable = []
        this._capacity = initialCapacity
        this._deleted = 0
    }

    static _hashString(str){
        let hash = 5381
        for (let i = 0 ; i < str.length ; i++){
            hash = (hash << 5) + hash + String.charCodeAt(i);
            hash = hash & hash
        }
        return hash >>> 0
    }

    get(key){
        let index = this._findSlot(key)
        if (this._hashTable[index] === undefined){
            throw new Error('key error');
        }
        return this._hashTable[index].value
    }

    set(key,value){
        //find ratio
        let capacityRatio = (this.length + this.deleted + 1) / this._capacity
        if (capacityRatio > HashMap.maxRatio){
            this._resize(this._capacity * HashMap.sizeRatio)
        }

        let index = this._findSlot(key)

        //if this is a new key
        if (!this._hashTable[index]){
            this.length++
        }
        this._hashTable[index] = {
            key,
            value,
            DELETED: false
        }
    }

    delete(key){
        let index = this._findSlot(key)
        if (this._hashTable[index] === undefined){
            throw new Error('key error')
        }
        this._hashTable[index].DELETED = true
        this.length--
        this.deleted++
    }

    _findSlot(key){
        let hash = this._hashString(key)
        let start = this._capacity % hash

        for (let i = start ; i < start + this._capacity ; i++){
            let index = i % this._capacity // 6 / 6 = 1...0
            let slot = this._hashTable[index]
            if (slot === undefined || (slot.key == key && !slot.DELETED)){
                return index
            }
        }
    }

    _resize(size){
        let oldSlots = this._hashTable
        this._capacity = size
        this.length = 0
        this._hashTable = []

        //put old key value pairs to the resized hashTable
        for (const slot of oldSlots){
            if (slot !== undefined && !slot.DELETED){
                this.set(slot.key , slot.value)
            }
        }
    }
}

module.exports = HashMap