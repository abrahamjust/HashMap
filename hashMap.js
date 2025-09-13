class HashMap {

    static loadfactor = 0.80;
    size = 0;

    constructor(capacity = 16) { // default is 16 buckets
        this.capacity = capacity;
        this.buckets = new Array(this.capacity).fill(null);
        this.size = 0;
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity; // inside the loop so that no integer overflows happen
        }
        return hashCode;
    }

    set(key, value) {
        let index = this.hash(key);
        if (this.buckets[index] == null) { // if the bucket is empty
            this.size++;
            this.buckets[index] = { key, value, next: null };
            if (this.size == this.capacity * HashMap.loadfactor) {
                this.resize();
            }
        } else { // if the bucket already has a node
            let head = this.buckets[index];

            // iterating till the end of the list and checking if any other node has the same key.
            while (head.next != null) {
                if (head.key == key) {
                    head.value = value;
                    return;
                }
                head = head.next;
            }
            head.next = { key, value, next: null };
        }
    }

    resize() {
        let oldBuckets = this.buckets;
        this.capacity *= 2;
        this.size = 0;
        this.buckets = new Array(this.capacity).fill(null);

        for (let bucket of oldBuckets) {
            while (bucket != null) {
                this.set(bucket.key, bucket.value);
                bucket = bucket.next;
            }
        }
    }

    get(key) {
        let index = this.hash(key);
        if (this.buckets[index] == null) {
            return null;
        } else {
            let head = this.buckets[index];
            while (head != null) {
                if (head.key == key) {
                    return head.value;
                }
                head = head.next;
            }
        }
        return null;
    }

    has(key) {
        let index = this.hash(key);
        if (this.buckets[index] == null) {
            return false;
        } else {
            let head = this.buckets[index];
            while (head != null) {
                if (head.key == key) {
                    return true;
                }
                head = head.next;
            }
        }
        return false;
    }

    remove(key) {
        let index = this.hash(key);
        if (this.buckets[index] == null) {
            return null;
        } else {
            let current = this.buckets[index];
            if (current.key == key) { // first node has the key
                if (current.next == null) { // only node in the map
                    this.buckets[index] = null;
                    this.size--;
                }
                else {
                    this.buckets[index] = current.next;
                }
            } else { // node in the middle or end have the key
                while (current.next != null && current.next.key != key) {
                    current = current.next;
                }
                if (current.next == null) { // key not present
                    return null;
                }
                if (current.next.next == null) { // last node has the key
                    current.next = null;
                } else { // middle node has the key
                    current.next = current.next.next;
                }
            }
        }
    }

    length() {
        let count = 0;
        for (let element of this.buckets) {
            while (element != null) {
                count++;
                element = element.next;
            }
        }
        return count;
    }

    clear() {
        this.buckets = new Array(this.capacity).fill(null);
        this.size = 0;
    }

    keys() {
        let keyArray = [];
        for (let element of this.buckets) {
            while (element != null) {
                keyArray.push(element.key);
                element = element.next;
            }
        }
        return keyArray;
    }

    values() {
        let valueArray = [];
        for (let element of this.buckets) {
            while (element != null) {
                valueArray.push(element.value);
                element = element.next;
            }
        }
        return valueArray;
    }

    entries() {
        let keyValueArray = [];
        for (let element of this.buckets) {
            while (element != null) {
                keyValueArray.push([element.key, element.value]);
                element = element.next;
            }
        }
        return keyValueArray;
    }
}

// testing

const test = new HashMap();

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

console.log(test.capacity);
console.log(test.size);

test.set('moon', 'silver');


console.log(test.capacity);
console.log(test.size);

console.log(test.get('apple'));
console.log(test.has('apple'));
console.log(test.values());
console.log(test.keys());
console.log(test.entries());

test.remove('apple');
console.log(test.has('apple'));
console.log(test.length());

test.clear();

console.log(test.entries());