'use client';
import React, {useState} from 'react';
import {Button, Card, Checkbox, Form, InputNumber, Select} from "antd";
import {formatMoney} from "@/app/helper";

const initialValues = {
    salary: 0,
    hasQuartet: false,
    fund: 10,
    libraryFee: 10,
    soundEngineerSalary: 300000
};

export default function Home() {
    const [form] = Form.useForm();
    const [eachSalary, setEachSalary] = useState(0);
  return (
      <Card title="Salary calculator" className="w-[500px] mx-auto flex flex-col gap-5 mt-10">
          <Form
              form={form}
              layout="vertical"
              initialValues={initialValues}
              onFinish={(values) => {
                  console.log(values)
                  const {salary, hasQuartet, fund, soundEngineerSalary, libraryFee} = values;
                  let remaining = salary - (hasQuartet ? 800000 : 0) - soundEngineerSalary
                  remaining = remaining - (remaining * fund / 100) - (remaining * libraryFee / 100)
                  setEachSalary(remaining / 5);
                  console.log(salary)
              }}
          >
              <Form.Item label="Орлого" name="salary" required>
                  <InputNumber
                      className="w-full"
                      suffix="₮"
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={(value) => value?.replace(/(,*)/g, '') || ''}
                  />
              </Form.Item>
              <Form.Item label="Квартит?" name="hasQuartet">
                  <Select>
                      <Select.Option value={true}>Yes</Select.Option>
                      <Select.Option value={false}>No</Select.Option>
                  </Select>
              </Form.Item>
              <Form.Item label="Цогийн цалин" name="soundEngineerSalary">
                  <InputNumber
                      className="w-full"
                      suffix="₮"
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={(value) => value?.replace(/(,*)/g, '') || ''}
                  />
              </Form.Item>
              <Form.Item label="Фонд %" name="fund">
                  <InputNumber suffix="%" className="w-full"/>
              </Form.Item>
              <Form.Item label="Library fee" name="libraryFee">
                  <InputNumber suffix="%" className="w-full"/>
              </Form.Item>
              <Button className="w-full" type="primary" htmlType="submit">Calculate</Button>
          </Form>
          {eachSalary > 0 && (
              <h1 className="mt-5 text-center">Хүний {formatMoney(eachSalary)}₮</h1>
          )}
      </Card>
  );
}
