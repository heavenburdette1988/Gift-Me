import React, {useContext, useEffect, useState} from "react"
import { GiftContext } from "../../providers/GiftProvider"
import { useNavigate } from "react-router-dom";
import Gift from "./Gift";


export const GiftForm = () => {

    const {getAllGifts,addGift} = useContext(GiftContext)

    const [gift, setGift] = useState({ 
        // title: "",
        // quantity:0,
        // notes: "",
        // url: "",
        // imageLocation: "",
        
    });

    const navigate = useNavigate();

    useEffect(()=> {
        getAllGifts()
    }, []);

   
    const handleControlledInputChange = (event)=> {
        const newGift = {...gift}
        newGift[event.target.id] = event.target.value
        
        setGift(newGift)
    }

    const handleSaveGift = (event) => {
        event.preventDefault()
 
  console.log(gift.title)
        if(gift.title === undefined || gift.quantity === undefined )
        {
            alert("Please fill out the title and/or quantity url fields.")
  
        } else {
          debugger
            addGift(gift)
            .then(navigate("/userDashboard"));
     }
      
    }

    
    return(
        <form className="giftForm">
            {/* form tags sends http request back to controller so that is why we used preventdefault  - telling form do not send anything to server bc we want to send the http request*/}
            <h2>New Gift</h2>
            <fieldset>
                <div className="formGroup">
                <label htmlFor="title">Gift Title</label>
                <input type="text" id="title" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="gift title" value={gift.title}/>
                </div>
           </fieldset>
           <fieldset>
                <div className="formGroup">
                <label htmlFor="url">Item Url:</label>
                <input type="text" id="url"  placeholder="Item Url" onChange={handleControlledInputChange} required className="form-control"  value={gift.url}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="formGroup">
                <label htmlFor="imageLocation">Item Image:</label>
                <input type="text" id="imageLocation"  placeholder="Image Url" onChange={handleControlledInputChange} required  className="form-control"  value={gift.imageLocation}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="formGroup">
                <label htmlFor="notes">Notes:</label>
                <input type="text" id="notes" placeholder="Notes" onChange={handleControlledInputChange} required  className="form-control" value={gift.notes}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="formGroup">
                <label htmlFor="quantity">Quantity:</label>
                <input type="number" id="quantity" placeholder="input the number of items requested" onChange={handleControlledInputChange} required  className="form-control" value={gift.quantity}/>
                </div>
            </fieldset>                                 
            <div className="form-group row col-sm-12 mx-auto mb-3">
                    <div className="col-sm-12">
                        <button type="submit" className="btn btn-primary" onClick={handleSaveGift}>
                            Save Gift
                        </button>
                    </div>
                    </div>
        </form>
    )
}
