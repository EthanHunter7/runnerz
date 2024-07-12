import React, { FormEvent } from "react";

interface Props {
    getRuns: () => void;
}

const RunForm:React.FC<Props> = ({getRuns}) => {
    const [idValue,setIdValue] = React.useState(0)
    const [titleValue,settitleValue] = React.useState('')
    const [startedOnValue,setstartedOnValue] = React.useState('')
    const [completedOnValue,setcompletedOnValue] = React.useState('')
    const [milesValue,setmilesValue] = React.useState(0)
    const [locationValue,setlocationValue] = React.useState('')

    const saveData = async() => {
    
        try {
            // Call your post API here
            await fetch("http://localhost:8080/api/runs", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: idValue,
                    title: titleValue,
                    startedOn: startedOnValue,
                    completedOn: completedOnValue,
                    miles: milesValue,
                    location: locationValue,
                }),
            });
            await getRuns();
        } catch (error) {
            alert("Run failed to save. Please try again.");
        }
        5
        setIdValue(0);
        settitleValue('');
        setstartedOnValue('');
        setcompletedOnValue('');
        setmilesValue(0);
        setlocationValue('');
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>, ) => {
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="runForm">
                <input 
                    type="number"
                    className="runInput"
                    id="id" 
                    name="id" 
                    value={idValue} 
                    onChange={(e) => setIdValue(Number(e.target.value))} 
                    placeholder="Title" 
                    required 
                />

                <input 
                    type="text"
                    className="runInput"
                    id="title" 
                    name="title" 
                    value={titleValue} 
                    onChange={(e) => settitleValue(e.target.value)} 
                    placeholder="Title" 
                    required 
                />
                
                <input 
                    type="datetime-local"
                    className="runInput" 
                    id="startedOn" 
                    name="startedOn" 
                    value={startedOnValue} 
                    onChange={(e) => setstartedOnValue(e.target.value)} 
                    placeholder="Started On" 
                    required 
                />
                
                <input 
                    type="datetime-local"
                    className="runInput"
                    id="completedOn" 
                    name="completedOn" 
                    value={completedOnValue} 
                    onChange={(e) => setcompletedOnValue(e.target.value)} 
                    placeholder="Completed On" 
                    required 
                />
                
                <input 
                    type="number"
                    className="runInput" 
                    id="miles" 
                    name="miles" 
                    value={milesValue} 
                    onChange={(e) => setmilesValue(Number(e.target.value))} 
                    placeholder="Miles" 
                    required 
                />
                
                <input 
                    type="text"
                    className="runInput"
                    id="location" 
                    name="location" 
                    value={locationValue} 
                    onChange={(e) => setlocationValue(e.target.value.toUpperCase())} 
                    placeholder="Location" 
                    required 
                />

                <button className="button" type="submit" onClick={() => saveData()}>Add</button>
            </div>
        </form>
    );
}

export default RunForm;