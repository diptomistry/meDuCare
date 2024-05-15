import React from 'react'

const AddInstructions = (addInstruction) => {
  const [instructions, setInstructions] = useState('');
  const handleInputChange = (event) => {
    setInstructions(event.target.value);
  };
  const handleSubmit = () => {
    addInstruction(instructions);
  };
    return (
      <div className='bg-blue-200 rounded-lg p-5 mt-5 '>
        <h3 className="text-lg font-semibold mb-2">Add Instructions</h3>
        <textarea
          rows="4"
          className="border border-backgroundColor  rounded-md px-3 py-2 w-full"
          placeholder="Enter instructions or notes..."
          value={instructions}
        onChange={handleInputChange} 
        />
      </div>
    );
  };

export default AddInstructions 