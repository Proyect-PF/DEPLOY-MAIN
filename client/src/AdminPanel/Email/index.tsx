import Button from "../../components/Buttons/Button/Button";
import Input from "../../components/Inputs/Input";
import { baseURL, PORT } from "../../utils/url&port";
import axios from "axios";
import { CSVLink } from "react-csv";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../../state/reducers";

const EmailList = () => {
  const [data, setData] = useState<any>([]);
  let csvLinkEl: any = React.createRef();
  const { allUsers } = useSelector((state: State) => state.admin);

  const handleExport = async () => {
    axios
      .get(`${baseURL}/users?emails=true`)
      .then((res: any) => setData(res.data));
  };

  useEffect(() => {
    if (data.length > 0) csvLinkEl.current.link.click();
  }, [data]);

  return (
    <div className="flex flex-col gap-8 m-10">
      <p className="text-2xl font-bold">Newsletter:</p>
      <div className="flex flex-row gap-20 mx-8">
        <div className="w-40">
          <p className="text-lg font-medium ">Usuarios suscriptos:</p>
          <p className="text-2xl font-semibold">
            {allUsers.filter((e) => e.news_letter === true).length}
          </p>
        </div>
        <div className="w-40">
          <Button
            text="Exportar usuarios"
            name="exportUsers"
            onClick={handleExport}
            disabled={false}
            type="button"
            className="justify center"
          />
          <CSVLink
            filename="Newsletter_User_List.csv"
            data={data}
            ref={csvLinkEl}
          />
        </div>
      </div>
    </div>
  );
};

export default EmailList;
