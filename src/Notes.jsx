import { useState } from "react";


export function Notes ({note, isEditing, onEdit, onSave, onDelete}){

    const [tempText, setTempText] = useState(note.text)

    const handleTextChange = (event) => {
       setTempText(event.target.value)
    }

    const handleSave = () => {
        onSave(tempText);
    }

    const handleDelete = () => {
        onDelete(note.id)
    }

    return (
        <div className={`note ${note.color}`}>
            {isEditing ? (

                <textarea className="text-area"
                value= {tempText}
                onChange={handleTextChange}
                />
            ): (
                <h3 onClick={onEdit}>{note.text || "Click  para modificar"}</h3> 
            )}
            
            {isEditing ? (
                        <i onClick={handleSave} className="ri-check-double-fill"></i>
                    ) : (
                        <i onClick={handleDelete} className="ri-delete-bin-6-line"></i>
                    )}
            
        </div>
    )
}