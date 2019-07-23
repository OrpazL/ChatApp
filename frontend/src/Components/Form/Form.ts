import { IAutoCompleteListItem } from '../../Modals/Interfaces/AutoComplete.interface';
import { EnumInputType } from '../../Modals/Enums/Form.enum';
import { Config, IValidation, FormControl, Option } from '../../Modals/Interfaces/Form.interface';


export const setFormControl = (label: string,
    type: EnumInputType,
    config: Config<any>,
    value: any,
    change: Function,
    validation: IValidation = {},
    list: IAutoCompleteListItem[] = [],
    extraFunctions: any = {}): FormControl<any> => {
    return {
        label,
        type,
        config,
        value,
        change,
        touched: false,
        valid: true,
        validation,
        list,
        extraFunctions,
    }
}

export const setConfig = (label: string, name: string, placeholder: string, type: any, options: Option[] = []): Config<any> => {
    return {
        label,
        name,
        options,
        placeholder,
        type
    }
}

export const checkFormValidation = (controls: FormControl<any>[]) => {
    let valid = true;
    controls.forEach(control => {
        valid = valid && control.valid;
    });
    console.log(controls);
    return valid;

}

export const checkIfTouched = (control: FormControl<any>) => {
    let touched = false;
    if (control.value) {
        touched = true;
    }
    return touched;
}
