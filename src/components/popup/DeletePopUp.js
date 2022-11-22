import React from 'react'


function DeletePopUp({ DeleteReq, rid, getreqFrom }) {
    return (
        <>
        

            {/* Delete Pop Up*/}
            <div className="modal fade fsm-popup" id="DeletePopUp">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <form>
                                <div className="add-custmer-form ">
                                    <div>
                                        <img src="images/deleteImg.png" style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block', height: '56px' }} />
                                        <h5 className="text-center">Are you sure to delete this <br /> {getreqFrom} ?</h5>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                        </div>
                                        <div className="col-md-6">
                                            <button type="button" className="btn btn-sm btn-outline-dark" onClick={() => window.$("#DeletePopUp").modal('hide')} >Cancel </button>
                                        </div>
                                        <div className="col-md-6">
                                            <button type="button" className="btn btn-sm btn-danger float-end" onClick={() => DeleteReq(rid)} >Delete </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeletePopUp;
