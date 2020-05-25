import GeneralForm from './general_form.js';

class ArtsForm extends GeneralForm
{
    constructor(props)
    {
        super(props);
        sessionStorage.setItem("lastValidPage", "/change_profile/arts_and_media");
    }
}

export default ArtsForm;