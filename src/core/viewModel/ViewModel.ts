export abstract class ViewModel<S extends State> {

    protected state: S;

    public constructor() {
        this.state = this.initState();
        this.onInit();
    }

    protected abstract initState(): S;

    protected abstract onInit(): void;

}