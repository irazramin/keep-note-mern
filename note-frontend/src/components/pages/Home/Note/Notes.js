import React, {useEffect, useState} from 'react';
import Note from "./Note";

const Notes = ({ controlRender }) => {
    const [notes, setNotes] = useState([]);

    useEffect(()=>{
        fetch(`http://localhost:4000/api/v1/note`)
            .then(res => res.json())
            .then(data => {
                setNotes(data);
                console.log(data)
            })
    }, [controlRender])



    return (
        <div className='container mx-auto mt-10'>
            {
                notes.length > 0 ?
                    <div className='grid grid-cols-6 gap-x-10 gap-y-7'>
                        {
                            notes.map(note =>  <Note note={note} key={note._id} />)
                        }
                    </div>
                    :

                    <div className='text-center mt-20'>
                        <h2>No notes found!</h2>
                    </div>
            }
        </div>
    );
};

export default Notes;
