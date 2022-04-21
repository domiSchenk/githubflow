import { cyan, green, red, white, yellow } from "chalk";

export class Branch {

    private colorFn(str: string): string { return white(str); }

    constructor(private _name: string) {
        this.calcColorFn();
    }

    private calcColorFn() {
        const branchName = this._name.toLowerCase()
        if (branchName === 'main') {
            this.colorFn = cyan;
        }
        else if (branchName.indexOf('feature') >= 0) {
            this.colorFn = yellow;
        }
        else if (branchName.indexOf('hotfix') >= 0) {
            this.colorFn = red;
        }
        else if (branchName.indexOf('release') >= 0) {
            this.colorFn = green;
        }
    }

    get name(): string {
        return this._name;
    }

    get coloredName(): string {
        return this.colorFn(this._name);
    }

    get isRelease(): boolean {
        return this._name.indexOf('release') >= 0;
    }

    get isHotfix(): boolean {
        return this._name.indexOf('hotfix') >= 0;
    }

    get isFeature(): boolean {
        return this._name.indexOf('feature') >= 0;
    }

    get isMain(): boolean {
        return this._name.toLowerCase() === 'main';
    }
}
