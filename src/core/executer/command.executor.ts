import { IStreamLogger } from "../handlers/stream-logger-interface";
import { ChildProcessWithoutNullStreams } from 'child_process';
import { ICommandExec } from "./command.types";

export abstract class CommandExecutor<Input>{
    constructor(private logger:IStreamLogger){}
    public async execute(){
        const input = await this.prompt();
        const command = this.buid(input);
        const stream = this.spawn(command);
        this.procesStream(stream,this.logger);
    }
    protected abstract prompt():Promise<Input>;
    protected abstract buid(input:Input):ICommandExec;
    protected abstract spawn(command:ICommandExec):ChildProcessWithoutNullStreams;
    protected abstract procesStream(stream:ChildProcessWithoutNullStreams,logger:IStreamLogger):void;

  
}