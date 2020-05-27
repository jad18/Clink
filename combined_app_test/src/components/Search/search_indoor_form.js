import SearchGeneralForm from './search_general_form.js';

class SearchIndoorForm extends SearchGeneralForm
{
    constructor(props)
    {
        super(props);
        sessionStorage.setItem("lastValidPage", "/search/indoor_activities");
    }
}

export default SearchIndoorForm;