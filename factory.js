// Factory Pattern


class A {
    constructor(id, nama) {
        this.id = id;
        this.nama = nama
    }
}

class B {
    constructor(id, nama) {
        this.id = id;
        this.name = nama
    }
}


class ClassPabrik {

    BuatClassA(id, nama) {
        return new A(id, nama)
    }

    BuatClassA(id, nama) {
        return new B(id, nama)
    }


}

function Pabrik() {
    return {
        BuatClassA: function(id, nama) {
            return new A(id, nama)
        },
    
        BuatClassA: function(id, nama) {
            return new B(id, nama)
        }   
    }
}


let myclass = new ClassPabrik().BuatClassA(1,'irfan');
console.log(myclass)

let myclass1 = Pabrik().BuatClassB(1,'irfan');
console.log(myclass)