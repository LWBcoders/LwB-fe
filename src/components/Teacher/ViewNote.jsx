import Output from 'editorjs-react-renderer';

const ViewNote = ({newNote}) => {

if (!newNote) {
  return <div>Loading...</div>;
}
const bodyData = JSON.parse(newNote.body);

  return (
    <div className="view-note-container">
      <h2>Note Details</h2>
      {newNote && (
        <div>
          <h3>Added Note:</h3>
          <p>Title: {newNote.title}</p>
          <p>Teacher: {newNote.teacher}</p>
          <p>Subject: {newNote.subject}</p>
          <p>Year Group: {newNote.year}</p>
          <p>Content: </p>
          <Output data={bodyData} />
        </div>
      )}
    </div>
  );
};

export default ViewNote ;
