import { derivative, parse } from "mathjs"

class MiniMaple{
    constructor() {
        this.valid_operations = ['+', '-', '*', '^'];
    }

    #find_invalid_operations(node) {
        let invalid_operations = [];
        let nodes = [node];
        while (nodes.length != 0) {
            let current_node = nodes.shift();
            if (current_node.isParenthesisNode)
                current_node = current_node.content;
            if (current_node.isOperatorNode && !this.valid_operations.includes(current_node.op))
                if (!invalid_operations.includes(current_node.op))
                    invalid_operations.push(current_node.op);
            if (current_node.hasOwnProperty('args'))
                current_node.args.forEach(child_node => {
                    nodes.push(child_node);
                });
        }
        return invalid_operations;
    }

    differentiate(input_function, variable) {
        if (input_function.length == 0)
            throw new Error('You should specify the function');
        if (variable.length == 0)
            throw new Error('You should specify the variable');
        let func = input_function.replace(/\s+/g, '');
        let node;
        try {
            node = parse(func);
        } catch (e) {
            throw new EvalError('Error occured during parsing. Re-check a string with function');
        }
        let invalid_operations = this.#find_invalid_operations(node);
        if (invalid_operations.length != 0)
            throw new EvalError(`You can use only these operations: ${this.valid_operations.join(', ')}. ` + 
        `There were invalid operations: ${invalid_operations.join(', ')}`);
        return derivative(func, variable).toString().replace(/\s+/g, '');
    }
}
export {MiniMaple}