import SearchGeneralForm from './search_general_form.js';

class SearchArtsForm extends SearchGeneralForm
{
    constructor(props)
    {
        super(props);
        sessionStorage.setItem("lastValidPage", "/search/arts_and_media");
    }
}

export default SearchArtsForm;