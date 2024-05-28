import React, { useEffect, useState } from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Col, Pagination, Row } from "antd";
import { WrapperNavbar, WrapperProducts } from "./style";
import { useLocation, useNavigate } from "react-router-dom";
import * as ProductService from "../../services/ProductService";
import Loading from "../../components/LoadingComponent/Loading";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperTypeProduct } from "../HomePage/style";

const TypeProductPage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 500);
  const [typeProduct, setTypeProduct] = useState([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginate, setPaginate] = useState({ page: 0, limit: 100, total: 1 });

  const fetchProductType = async (type, page, limit) => {
    setLoading(true);
    const res = await ProductService.getProductType(type, page, limit);
    if (res?.status === "OK") {
      setProducts(res?.data);
      setPaginate({ ...paginate, total: res?.totalPage });
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === "OK") {
      setTypeProduct(res?.data);
    }
  };
  useEffect(() => {
    fetchAllTypeProduct();
  }, []);

  useEffect(() => {
    if (state) {
      fetchProductType(state, paginate.page, paginate.limit);
    }
  }, [state, paginate.page, paginate.limit, searchDebounce]);

  // const onChange = (current, pageSize) => {
  //   setPaginate({ ...paginate, page: current - 1, limit: pageSize });
  // };
  return (
    <Loading isPending={loading}>
      <div
        style={{
          padding: "0 120px 0px 120px",
          background: "#fdafbc",
          margin: "0 auto",
        }}
      >
        <WrapperTypeProduct>
          <span onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            TRANG CHỦ
          </span>
          {typeProduct.map((item) => {
            return <TypeProduct name={item} key={item} />;
          })}
        </WrapperTypeProduct>
      </div>
      <div
        style={{
          height: "fit-content",
          width: "100%",
          background: "#efefef",
        }}
      >
        <div style={{ width: "1120px", margin: "0 auto", height: "100%" }}>
          <Row
            style={{
              flexWrap: "nowrap",
              paddingTop: "10px",
              height: "calc(100% - 20px)",
            }}
          >
            <WrapperNavbar span={4}>
              <NavbarComponent />
            </WrapperNavbar>
            <Col
              span={20}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                justifyContent: "space-between",
              }}
            >
              <WrapperProducts>
                {products
                  ?.filter((pro) => {
                    if (searchDebounce === "") {
                      return pro;
                    } else if (
                      pro?.name
                        .toLowerCase()
                        ?.includes(searchDebounce?.toLowerCase())
                    ) {
                      return pro;
                    }
                  })
                  ?.map((product) => {
                    return (
                      <CardComponent
                        key={product._id}
                        countInStock={product.countInStock}
                        description={product.description}
                        image={product.image}
                        name={product.name}
                        price={product.price}
                        rating={product.rating}
                        type={product.type}
                        sold={product.sold}
                        id={product._id}
                      />
                    );
                  })}
              </WrapperProducts>
              {/* <Pagination
                defaultCurrent={paginate.page + 1}
                total={paginate?.total}
                onChange={onChange}
                style={{ marginTop: "10px", marginLeft: "335px" }}
              /> */}
            </Col>
          </Row>
        </div>
      </div>
    </Loading>
  );
};

export default TypeProductPage;
