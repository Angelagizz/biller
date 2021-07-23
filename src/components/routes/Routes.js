import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Electricity from "../features/electricity/Electricity";
import TagihanConfirmation from "../features/electricity/TagihanConfirmation";
import TokenConfirmation from "../features/electricity/TokenConfirmation";
import Newbill from "../features/newbill/Newbill";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import Subscription from "../pages/subscription/Subscription";
import Dashboard from "../../components/features/dashboard/Dashboard";
import MainHistory from "../../components/pages/history/main/MainHistory";
import Bpjs from "../../components/features/bpjs/Bpjs";
import BpjsReceipt from "../features/bpjs/Receipt";
import PdamReceipt from "../pages/pdam/Receipt";
import Pdam from "../pages/pdam/Pdam";
import Header from "../pages/Header/Header";
import NewSubscription from "../features/newsubscriptions/NewSubscription";
import ReceiptPulsa from "../features/mobile/ReceiptPulsa";
import ReceiptPostpaid from "../features/mobile/ReceiptPostpaid";
import ReceiptInternet from "../features/mobile/ReceiptInternet";
import Internet from "../features/mobile/Internet";
import Pulsa from "../features/mobile/Pulsa";
import Postpaid from "../features/mobile/Postpaid";
import LandlineReceipt from "../features/landline/Receipt";
import LandlineConfirmation from "../features/landline/landlineConfirmation";
import LandlineUpload from "../features/landline/landlineUploadReceipt";
import Notif from "../pages/notifikasi/Notif";
import ReceiptTagihan from "../features/electricity/ReceiptTagihan";
import ReceiptToken from "../features/electricity/ReceiptToken";
import BpjsConfirmation from "../features/bpjs/BpjsConfirmation";
import PdamConfirmation from "../pages/pdam/PdamConfirmation";
import InternetConfirmation from "../features/internetntv/internetConfirmation";
import ReceiptInternetTv from "../features/internetntv/ReceiptInternetTv";
import InternetUploadReceipt from "../features/internetntv/InternetUploadReceipt";
import BpjsUploadReceipt from "../features/bpjs/BpjsUploadReceipt";
import PdamUploadReceipt from "../pages/pdam/PdamUploadReceipt";
import TokenConfirmationUpload from "../features/electricity/TokenConfrimationUpload";
import UpdateProfile from "../pages/updateProfile/updateProfile";
import TagihanConfirmationUpload from "../features/electricity/tagihanConfirmationUpload";
import RecurringSubs from "../features/newsubscriptions/RecurringSubs";

const Routes = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Header} />
          <Route
            path="/internettv/receipt/"
            exact
            component={ReceiptInternetTv}
          />
          <Route path="/newbill" exact component={Newbill} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/newbill/electricity" exact component={Electricity} />
          <Route path="/newbill/bpjs" exact component={Bpjs} />
          <Route path="/newbill/pdam" exact component={Pdam} />
          <Route path="/newbill/internet" exact component={Internet} />
          <Route path="/newbill/pulsa" exact component={Pulsa} />
          <Route path="/newbill/postpaid" exact component={Postpaid} />
          <Route path="/pdam/receipt" exact component={PdamReceipt} />
          <Route path="/bpjs/receipt" exact component={BpjsReceipt} />
          <Route path="/landline/receipt" exact component={LandlineReceipt} />
          <Route
            path="/landline/confirmation/:id"
            exact
            component={LandlineConfirmation}
          />
          <Route path="/landline/upload/:id" exact component={LandlineUpload} />
          <Route
            path="/elctricity/token_confirmation/:no_meter/:harga"
            exact
            component={TokenConfirmation}
          />
          <Route
            path="/electricity/token/upload/:no_meter/:harga"
            exact
            component={TokenConfirmationUpload}
          />

          <Route path="/update/profile" exact component={UpdateProfile} />
          <Route
            path="/bpjs/confirmation/:id"
            exact
            component={BpjsConfirmation}
          />
          <Route
            path="/pdam/confirmation/:nocust"
            exact
            component={PdamConfirmation}
          />
          <Route
            path="/internettv/confirmation/:id"
            exact
            component={InternetConfirmation}
          />
          <Route
            path="/internettv/confirmation/upload/:id"
            exact
            component={InternetUploadReceipt}
          />
          <Route
            path="/pdam/confirmation/upload/:id"
            exact
            component={PdamUploadReceipt}
          />
          <Route
            path="/bpjs/confirmation/upload/:id"
            exact
            component={BpjsUploadReceipt}
          />
          <Route path="/newSubscription" exact component={NewSubscription} />
          <Route
            path="/electricity/tagihanconfirmation/:idpel"
            exact
            component={TagihanConfirmation}
          />
          <Route
            path="/electricity/tagihan/upload/:idpel"
            exact
            component={TagihanConfirmationUpload}
          />
          <Route path="/biller/login" exact component={Login} />
          <Route exact path="/biller/signup" component={Signup} />
          <Route path="/biller/subscription" component={Subscription} />
          <Route path="/history" component={MainHistory} />
          <Route path="/update/profile" exact component={UpdateProfile} />
          <Route path="/notification" component={Notif} />
          <Route path="/pulsa/receipt" component={ReceiptPulsa} />
          <Route path="/internet/receipt" component={ReceiptInternet} />
          <Route path="postpaid/receipt" component={ReceiptPostpaid} />
          <Route path="/electricity/token/receipt" component={ReceiptToken} />
          <Route
            path="/electricity/tagihan/receipt"
            component={ReceiptTagihan}
          />
          <Route path="/recurring/subscription" component={RecurringSubs} />
        </Switch>
      </Router>
    </div>
  );
};
export default Routes;
