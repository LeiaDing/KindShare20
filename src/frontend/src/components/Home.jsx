import React, { useEffect, useState } from "react";
import MetaData from "./layout/MetaData";
import ProductItem from "./product/ProductItem";
import Loader from "./layout/Loader";
import toast from "react-hot-toast";
import CustomPagination from "./layout/CustomPagination";
import { useSearchParams } from "react-router-dom";
import Filters from "./layout/Filters";
// **新增的导入**
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../../src/backend.did.js"; // 根据实际路径调整
import { backend } from "../../../declarations/backend"; // 根据实际生成路径调整

const Home = () => {
  let [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") || "";
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const category = searchParams.get("category");
  const ratings = searchParams.get("ratings");

  const params = { page, keyword };

  min !== null && (params.min = min);
  max !== null && (params.max = max);
  category !== null && (params.category = category);
  ratings !== null && (params.ratings = ratings);

  // **更简洁的 data 初始化**
  const [data, setData] = useState([]); // 初始化为一个空数组
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // **获取产品数据的新方法**
  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        // **创建 Actor 来与 Canister 交互**
        const agent = new HttpAgent();
        const actor = Actor.createActor(idlFactory, {
          agent,
          canisterId: "be2us-64aaa-aaaaa-qaabq-cai",
        });

        // **调用 getproducts 方法获取产品数据**
        const products = await actor.getproducts();
        setData(products); // 直接将产品数组设置为 data 状态
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
        toast.error("Failed to fetch products from canister.");
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, [page, keyword, min, max, category, ratings]);

  const columnSize = keyword ? 4 : 3;

  if (isLoading) return <Loader />;

  return (
    <>
      <MetaData title={"Share the Love,Find Your Needs--KindShare"} />
      <div className="row">
        {keyword && (
          <div className="col-6 col-md-3 mt-5">
            <Filters />
          </div>
        )}
        <div className={keyword ? "col-6 col-md-9" : "col-6 col-md-12"}>
          <h1 id="products_heading" className="text-secondary">
            {keyword
              ? `${data.length} Products found with keyword: ${keyword}`
              : "Latest Offering"}
          </h1>

          <section id="products" className="mt-5">
            <div className="row">
              {data.map((product) => (
                <ProductItem product={product} columnSize={columnSize} />
              ))}
            </div>
          </section>

          {/* 如果你的 Canister 返回分页数据，也需要在这里处理 */}
          {/* <CustomPagination
            resPerPage={data?.resPerPage}
            filteredProductsCount={data?.filteredProductsCount}
          /> */}
        </div>
      </div>
    </>
  );
};

export default Home;
