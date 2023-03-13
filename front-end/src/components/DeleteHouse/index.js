import HouseDataService from "../../services/HouseService.js";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const DeleteHouse = props => {
    console.log("inside delete");

    const params = useParams();
    const navigate = useNavigate();

    HouseDataService.remove(params.id)
      .then(response => {
        console.log(response.data);
        navigate("/houses");
      })
      .catch(e => {
        console.log(e);
      });

    console.log(params);

    return "deeleted";
}

export default DeleteHouse;