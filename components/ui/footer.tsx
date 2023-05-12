import Link from "next/link";


export default function Footer() {

  return (
    <>
      <div className="container-fluid p-0 m-0 footer_background">
    <div className="d-flex flex-column flex-lg-row justify-content-between px-5 align-items-center w-100"
      style={{height: "100%"}}>
      <div className="d-flex flex-row text-center icon_wrapper py-3 py-lg-1">
        <Link href={"#"}><img src="/fb.png" className="mx-2 border-radious-50 footer-icons" alt="" /></Link>
        <Link href={"#"}><img src="/insta.png" className="mx-2 border-radious-50 footer-icons" alt="" /></Link>
        <Link href={"#"}><img src="/email.png" className="mx-2 border-radious-50 footer-icons" alt="" /></Link>
        <Link href={"#"}><img src="/twitter.png" className="mx-2 border-radious-50 footer-icons" alt="" /></Link>
      </div>
      <div className="d-flex flex-row text-center icon_wrapper py-3 pb-lg-1">
        <a href="#">
          <p className="text-white mb-0" style={{fontSize: "18px"}}>
            Terms and Conditions
          </p>
        </a>
      </div>
    </div>
  </div>

    </>
  );
}
