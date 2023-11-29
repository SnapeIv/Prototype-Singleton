class Logger {
    private static instance: Logger | null = null;

    private constructor() {}

    static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    log(message: string): void {
        console.log(`[LOG] ${message}`);
    }
}

abstract class IProgram {
    protected logger: Logger;

    constructor() {
        this.logger = Logger.getInstance();
    }

    abstract log(message: string): void;
}


class DB implements Cloneable {
    private data: string[];

    constructor() {
        this.data = [];
    }

    addData(item: string): void {
        this.data.push(item);
    }

    getData(): string[] {
        return this.data;
    }

    clone(): DB {
        const clonedDB = new DB();
        clonedDB.data = [...this.data];
        return clonedDB;
    }
}

interface Cloneable {
    clone(): Cloneable;
}


const main = () => {
    const program1 = new Program1();
    const program2 = new Program2();

    // Извикване на методите, които извикват логване
    program1.log("Message from Program1");
    program2.log("Message from Program2");

    // Работа с базата данни
    const originalDB = new DB();
    originalDB.addData("Data 1");
    const clonedDB = originalDB.clone();

    console.log("Original DB data:", originalDB.getData());
    console.log("Cloned DB data:", clonedDB.getData());
};

class Program1 extends IProgram {
    log(message: string): void {
        this.logger.log(`Program1: ${message}`);
    }
}

class Program2 extends IProgram {
    log(message: string): void {
        this.logger.log(`Program2: ${message}`);
    }
}

main();
