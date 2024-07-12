/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import './App.css'
import Loader from './components/Loader'
import Runs from './components/Runs'
import RunForm from './components/RunForm'
import {closestCorners, DndContext, DragEndEvent} from '@dnd-kit/core'
import {SortableContext, verticalListSortingStrategy, arrayMove} from '@dnd-kit/sortable'


function App() {
  const [runs, setRuns] = useState<Run[]>([])
  const [err, setError] = useState({})

  const getRunsFromAPI = async () => {
    
    fetch("http://localhost:8080/api/runs")
    .then(response => response.json())
    .then(res => setRuns(res.slice(0, 10)))
    .catch(err => setError(err))
}

const getRunPos = (id: number) => runs.findIndex(run => run.id === id)

const handleDragEnd = (event: DragEndEvent) => {
  const { active, over } = event;

  if (!over) return;

  setRuns((runs: Run[]) => {
    const originalPos = getRunPos(active.id);
    const newPos = getRunPos(over.id);

    return arrayMove(runs, originalPos, newPos);
  });
};

  interface Run {
    id: number;
    title: string;
    startedOn: string;
    completedOn: string;
    miles: number;
    location: string;
}


  useEffect(() => {
    getRunsFromAPI();
  }, [])

  return (
    <div className='App'>
      
      <div>
        <RunForm getRuns={getRunsFromAPI}/>
      </div>
      
      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <SortableContext items={runs} strategy={verticalListSortingStrategy}>
        {runs.length > 0 ? runs.map((run:Run, key: number ) => <Runs run={run} getRuns = {getRunsFromAPI} key={key}/>) : (<Loader />)}
        </SortableContext>
      </DndContext>      
      
    </div>
  )
}

export default App;
