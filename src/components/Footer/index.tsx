import { associationName } from "@/data/association";
import { withBasePath } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="association-footer">
      <div className="association-wrap association-split">
        <div><strong>{associationName}</strong><p>在校园里学习、动手和分享。</p></div>
        <nav aria-label="页脚导航">
          <a href={withBasePath("/departments")}>部门</a>
          <a href={withBasePath("/activities")}>活动</a>
          <a href={withBasePath("/join")}>加入我们</a>
        </nav>
      </div>
    </footer>
  );
}
