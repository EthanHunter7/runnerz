import React from "react";
import {RunTypes} from '../types/RunTypes'
import  '../App.css'
import {useSortable} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'

interface Props {
    run: RunTypes;
    getRuns: () => void;
}

const handleDelete = async (run: RunTypes, getRuns: () => void ) => {
    try {
        // Call your delete API here
        await fetch(`http://localhost:8080/api/runs/${run.id}`, {
            method: 'DELETE',
        });
        await getRuns();
    } catch (error) {
        alert("Run failed to delete. Please try again.");
    }
};


const Runs:React.FC<Props> = ({run, getRuns}) => {

    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: run.id})

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    return (
        <div ref={setNodeRef} {...attributes} {...listeners} style={style} className="run">
            <p className="runData">{run.id}</p>
            <p className="runData">{run.title}</p>
            <p className="runData">{run.startedOn}</p>
            <p className="runData">{run.completedOn}</p>
            <p className="runData">{run.miles}</p>
            <p className="runData">{run.location}</p>
            <div>
                <button onClick={() => handleDelete(run, getRuns)}>Delete</button>
            </div>
        </div>
    );
}

export default Runs;

