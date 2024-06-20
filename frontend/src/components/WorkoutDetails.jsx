import { useWorkoutContext } from '../hooks/useWorkoutContext'
import { MaterialSymbol } from 'react-material-symbols';
import 'react-material-symbols/rounded';
import { format, formatDistanceToNow } from 'date-fns';



const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutContext()

  const handleClick = async () => {
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Number of reps: </strong>{workout.reps}</p>
      <p>
        <strong>Created At: </strong>
        {format(new Date(workout.createdAt), 'MMMM d, yyyy h:mm a')} 
        {/* This formats the date nicely */}
      </p>
      <p>
        <strong>Time Ago: </strong>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
        {/* This shows relative time */}
      </p>
      <span onClick={handleClick}>       
         <MaterialSymbol icon="delete" style={{ fontSize: '24px' }} /> {/* Use the delete symbol */}
      </span>
    </div>
  )
}

export default WorkoutDetails