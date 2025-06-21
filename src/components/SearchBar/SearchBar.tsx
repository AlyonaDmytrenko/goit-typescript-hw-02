import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

interface SearchBarProps {
  onSetSearchQuery: (searchTerm:string)=> void;
}

const searchBarSchema = Yup.object().shape({
  searchTerm: Yup.string().required("Search term is required"),
});

const FORM_INITIAL_VALUES = {
  searchTerm: "",
};
const SearchBar: React.FC<SearchBarProps> = ({ onSetSearchQuery }) => {
  const handleSubmit = (values: {searchTerm: string}) => {
    onSetSearchQuery(values.searchTerm);
  };

  return (
    <header>
      <Formik
        initialValues={FORM_INITIAL_VALUES}
        validationSchema={searchBarSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <label>
            <Field
              type="text"
              name="searchTerm"
              placeholder="Enter search query..."
            />
            <ErrorMessage component="p" name="searchTerm" />
          </label>
          <button type="submit" aria-label="Search">
            🧷
          </button>
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;
