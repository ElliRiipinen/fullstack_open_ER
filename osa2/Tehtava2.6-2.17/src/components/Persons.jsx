const Persons = ({persons, onDelete}) => {
    return(
         <ul>
              {persons.map((person, index) =>(
                <li key={index}>{person.name} {person.number}
                <button onClick={() => onDelete(person.id, person.name)}>delete</button></li>
              ))}
          </ul>
    )
}

export default Persons