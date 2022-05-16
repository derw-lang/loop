import { Program, RunningProgram } from "./Loop";

export function program<model, msg, action>(
    program_: Program<model, msg, action>
): RunningProgram<model, msg, action> {
    let model: model = program_.initialModel;
    function listener(msg: msg): void {
        model = program_.update(msg, model, listener);
        const view: action = program_.action(model, listener);
    }
    const view: action = program_.action(program_.initialModel, listener);
    return {
        program: program_,
        send: listener,
    };
}
