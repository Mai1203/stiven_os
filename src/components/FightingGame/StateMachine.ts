export interface State {
  name: string;
  enter(): void;
  update(time: number, delta: number): void;
  exit(): void;
}

export class StateMachine {
  private states: Map<string, State> = new Map();
  private currentState: State | null = null;
  public previousState: State | null = null;

  public addState(state: State) {
    this.states.set(state.name, state);
  }

  public transition(name: string) {
    if (this.currentState?.name === name) return;
    
    const newState = this.states.get(name);
    if (!newState) {
      console.warn(`State ${name} not found`);
      return;
    }

    if (this.currentState) {
      this.currentState.exit();
    }

    this.previousState = this.currentState;
    this.currentState = newState;
    this.currentState.enter();
  }

  public update(time: number, delta: number) {
    if (this.currentState) {
      this.currentState.update(time, delta);
    }
  }

  public getCurrentStateName(): string {
    return this.currentState?.name || '';
  }
}
