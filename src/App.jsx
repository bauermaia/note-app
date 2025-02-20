

import { useEffect, useState } from 'react'
import './App.css'
import { Notes } from './Notes'

function App() {
  const [newNote, setNewNote]= useState (null) //nuevas notas
  const [notesList, setNotesList] = useState([]) //lista de notas
  const [editingNoteId, setEditingNoteId] = useState(null)
  const [selectedColor, setSelectedColor] = useState("c5")

  //apenas se carga la pagina, recuepra la lista de notas del local storage
 useEffect(()=> {
  const savedNotes = JSON.parse(localStorage.getItem('notas')) || [];
  setNotesList(savedNotes)
 }, [])

 //funcion para actualizar local storage cuando noteslist cambie
 const updateLocalStorage = (updatedNotes) => {
  localStorage.setItem('notas', JSON.stringify(updatedNotes));
 }


 //al hacer click en agregar nota, se crea un estado con el id y texto vacio
  const handleClick=()=>{
    const newNoteObj = { id: Date.now(), text: "", color: selectedColor };
    setNewNote(newNoteObj); 
    }

    
    //al guardar, se comprueba que haya una nueva nota y que no este vacia, se suma al array anterior de notas, la neuva nota y se limpia el estado new note
    const saveNotes = (text) => {
     if(newNote){
      //Crea un nuevo objeto de nota, copiando el objeto newNote y actualizando su text con el contenido recibido.
      const newNoteObj = {...newNote, text};

     // Actualiza la lista de notas (notesList) usando una función que recibe el estado anterior (prevNotes).
    setNotesList((prevNotes) => {
      //Crea una nueva lista de notas, agregando la nueva nota al final del array.
      const updatedNotes = [...prevNotes, newNoteObj];
      updateLocalStorage(updatedNotes);
      //Devuelve la lista actualizada para actualizar el estado notesList.
      return updatedNotes
    });
    setNewNote(null);

     }
    };

    

    //CUANDO se toca el icono de editar, se establece el id de la nota editada en editing note
    const editNote = (id) => {
      setEditingNoteId(id);
    };

    //es una funcion que al llamarla, recibe el id de la nota editada, el nuevo texto y recorre el array de notas hasta encontrar el que coincide con el de la nota buscada y actualza el texto
    //guarda la neuva lista de notas y resetea las en edición
    const saveEditedNote = (id, newText) => {
      setNotesList((prevNotes) => {
        const updatedNotes = prevNotes.map((note) =>
          note.id === id ? { ...note, text: newText } : note
        );
        updateLocalStorage(updatedNotes);
        return updatedNotes;
      });


      setEditingNoteId(null)
    };

    const deleteNote=(id)=>{
      setNotesList((prevNotes)=> {
        const updatedNotes = prevNotes.filter((note) => note.id !== id);
        updateLocalStorage(updatedNotes); // Guardar en localStorage
        return updatedNotes;
      })
    }

    const handleColor=(colorClass)=> {
      setSelectedColor(colorClass)
    }

  return(
    <>
    <header>
      <h1>Your notes 📍 </h1>
      <i onClick={handleClick} className="ri-add-box-line"></i>
      <div className='color-container'>
      <div onClick={()=>handleColor("c1")} className='note-color c1'></div>
      <div onClick={()=>handleColor("c2")} className='note-color c2'></div>
      <div onClick={()=>handleColor("c3")} className='note-color c3'></div>
      <div onClick={()=>handleColor("c4")} className='note-color c4'></div>
      <div onClick={()=>handleColor("c5")} className='note-color c5'></div>
      </div>
    
      </header>

      <main>
        {
          newNote && 
            <Notes note={newNote} isEditing={true} onSave={saveNotes}  />
          
        }

        {notesList.map((note)=> (
          <Notes 
          key={note.id}
          note={note}
          isEditing={editingNoteId === note.id}
          onEdit= {()=> editNote(note.id)}
          onSave={(newText) => saveEditedNote(note.id, newText)}
          onDelete={()=>deleteNote(note.id)}
          />

        ))}
      </main>
    </>
  )


}

export default App
