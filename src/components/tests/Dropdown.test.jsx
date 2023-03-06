import { screen, render, fireEvent } from "@testing-library/react";
import Dropdown from "../Dropdown"
describe("Dropdwon ui tests", () => {
    test("renders entry for each option provided", async () => {
        render(<Dropdown placeholder={"search"} options={["hello", "world"]}/>)
        const options = await screen.findAllByTestId("option")
        expect(options).toHaveLength(2)
    })
    test("when submitted, selected has a length of +1", async () => {
        render(<Dropdown placeholder={"search"} options={["hello", "world"]}/>)
        const input = await screen.findByPlaceholderText("search")
        const button = await screen.findByTestId("submit")
        fireEvent.change(input, {value: "testing"})
        fireEvent.click(button)
        const selected = await screen.findAllByTestId("selected")
        expect(selected[0]).toBeInTheDocument()
        expect(selected).toHaveLength(1)
    })
})