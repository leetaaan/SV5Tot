import { createContext, useContext } from "react";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "../App";
import EventEditor from "../components/event.component";
import PublishEvent from "../components/publish-event.component";

const eventStructure = {
  title: '',
  tcc: '',
  ddtbb: '',
  ddt1: '',
  ddt2: '',
  ddt3: '',
  ddt4: '',
  httbb: '',
  htt1: '',
  htt2: '',
  htt3: '',
  htt4: '',
  htt5: '',
  tlt1: '',
  tlt2: '',
  tnt1: '',
  tnt2: '',
  hntbb: '',
  hnt1: '',
  hnt2: '',
  hnt3: '',
  author: { personal_info: { } },
}

export const EditorEventContext = createContext({})
const EditorSV5Tot = () => {
  const [ event, setEvent ] = useState(eventStructure)
  const [editorState, setEditorState] = useState("event");
  const [textEditor, setTextEditor] = useState({isReady: false});

  let { userAuth: { access_token } } = useContext(UserContext);

  return (
    <EditorEventContext.Provider value={{ event, setEvent, editorState, setEditorState, textEditor, setTextEditor }}>
    {
      access_token === null ? <Navigate to="/signin" />
      : editorState === "event" ? <EventEditor/> : <PublishEvent/>
    }
  </EditorEventContext.Provider>
  )
};

export default EditorSV5Tot;
