import Swal from "sweetalert2"
import { insertInLS } from "../../../Utils/utils"
import history from "../../../Utils/history";

export async function manageUrls(props,url) {

    fetch(url)
        .then(res => {
            if (res.status == 200 || res.status == 201) {
                insertInLS("adno_image_url", url)

                props.history.push("/new")
            } else {
                throw new Error(`Error ${res.status}`)
            }
        })
        .catch(err => {
            console.log(err);
            Swal.fire({
                title: "Impossible de traiter l'url fournie",
                showCancelButton: false,
                showConfirmButton: true,
                confirmButtonText: 'OK',
                icon: 'error',
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        console.log("OK");
                    }
                })
        })



}